const sequelize = require('sequelize');
const Op = sequelize.Op
const models = require('../../models/index');
const _ = require('lodash');
const moment = require('moment');
const utils = require('../../utils/utils');
const DataTypes = require('./DataTypes');

const Constants = require('./Constants');


/**
 * Generic create validation function
 * @param data
 * @param options   // options is better for transactions
 * @param skipValidation    // if user wants to skip the validation
 * @returns {Promise<{data: *, err, success: *}>}
 * @constructor
 */
const CreateValidation = (
    data,
    attributes,
    skipValidation = false,
    options = {},
) => {

    if (!utils.empty(data.id)) {
        return utils.classResponse(false, {}, 'id field should be empty')
    }

    if (!skipValidation) {
        if (!isValid(attributes, data)) {
            return utils.classResponse(false, {}, 'data is not valid')
        }
    }
    return utils.classResponse(true, data, '')
};

/**
 * Generic update validation function
 * 
 * @param data
 * @param options   // options is better for transactions
 * @param skipValidation    // if user wants to skip the validation
 * @returns {Promise<{data: *, err, success: *}>}
 * @constructor
 */
const UpdateValidation = (
    data,
    attributes,
    updateBy = 'id',
    individualHooks = false,
    skipValidation = false,
    options = {},
) => {
    if (utils.empty(data[updateBy])) {
        return utils.classResponse(false, {}, 'id field should not be empty')
    }

    if (!skipValidation) {
        if (!isValid(attributes, data)) {
            return utils.classResponse(false, {}, 'data is not valid')
        }
    }
    let query = getQueryByData({ [updateBy]: data[updateBy] }, attributes, [], false, false);

    query.individualHooks = individualHooks
    let dataCopy = { ...data }
    delete dataCopy[updateBy]
    return utils.classResponse(true, { data: dataCopy, query: query }, '')
};

/**
 * Delete Validate function
 * 
 * @param {*} data 
 * @param {*} attributes 
 * @param {*} deleteBy 
 * @param {*} options 
 * @returns 
 */
const DeleteValidation = (data, attributes, deleteBy = 'id', options = {}) => {
    if (utils.empty(data[deleteBy])) {
        return utils.classResponse(false, {}, 'id field should not be empty')
    }
    let query = getQueryByData({ [deleteBy]: data[deleteBy] }, attributes, [], false);
    return utils.classResponse(true, query, '');
};

const isValid = (attributes, data) => {
    let keys = attributes
    let valid = true;
    let key = Object.keys(keys);

    for (let i = 0; i < key.length; i++) {
        switch (typeof data[key[i]]) {
            case DataTypes.NUMBER:
                if (!(keys[key[i]] === DataTypes.INTEGER || keys[key[i]] === DataTypes.FLOAT || keys[key[i]] === DataTypes.NUMBER || keys[key[i]] === DataTypes.JSON)) {
                    valid = false
                }
                break;
            case DataTypes.STRING:
                if (!(keys[key[i]] === DataTypes.STRING || keys[key[i]] === DataTypes.TEXT || keys[key[i]] === DataTypes.JSON)) {
                    valid = false
                }
                break;
            case DataTypes.BOOLEAN:
                if (!(keys[key[i]] === DataTypes.BOOLEAN || keys[key[i]] === DataTypes.JSON)) {
                    valid = false
                }
                break;
            case DataTypes.OBJECT:
                if (keys[key[i]] === DataTypes.DATE) {
                    if (moment(data[key[i]]).isValid() === false) {
                        valid = false
                    }
                }
                if (keys[key[i]] === DataTypes.ARRAY) {
                    if (Array.isArray(data[key[i]]) === false) {
                        valid = false
                    }
                }
                break;
            default:
                break;
        }
        //console.log(typeof data[key[i]], valid, key[i])
    }
    return valid;
};

/**
 * Get Query Maker
 * 
 * @param {*} data 
 * @param {*} attributes 
 * @param {*} includeTables 
 * @param {*} pagination 
 * @param {*} order 
 * @returns 
 */
const getQueryByData = (
    data,
    attributes,
    includeTables = [],
    pagination = true,
    order = true,
) => {
    let query = {};
    let whereQuery = getWhereQuery(attributes, data);

    if (!utils.empty(whereQuery)) {
        query.where = whereQuery
    }
    if (!utils.empty(includeTables)) {
        query.include = includeTables
    }
    if (order) {
        query.order = getOrderBy(attributes, data);
    }
    if (pagination) {
        query.limit = getSize(data);
        query.offset = (getPage(data) - 1) * query.limit
    }

    query.attributes = attributes

    return query;
};

const filterDataByClass = (attributes, data) => {
    return _.assign(
        {},
        _.pick(
            data,
            _.intersection(
                Object.keys(data),
                _.concat(Object.keys(attributes), ['createdTill'])
            )
        )
    );
};

/**
 * Where clause maker for get query
 * 
 * @param {*} attributes 
 * @param {*} data 
 * @returns 
 */
const getWhereQuery = (attributes, data) => {
    data = filterDataByClass(attributes, data);

    let query = {};
    let keys = Object.keys(data);

    for (let i = 0; i < keys.length; i++) {
        switch (keys[i]) {
            case 'name':
                query['name'] = {
                    [Op.iLike]: `%${data[keys[i]]}%`
                };
                break;
            case 'nameSlug':
                query['nameSlug'] = {
                    [Op.iLike]: `%${data[keys[i]]}%`
                };
                break;
            case 'createdAt':
                query['createdAt'] = {
                    [Op.between]: [moment(data.createdAt).toDate(), moment(data.createdTill).toDate()]
                };
                break;
            case 'createdTill':
                break;
            case 'roles':
                query['roles'] = {
                    [Op.contains]: [data[keys[i]]]
                };
                break;
            default:
                if (!Array.isArray(data[keys[i]])) {
                    query[keys[i]] = data[keys[i]];
                } else {
                    query[keys[i]] = utils.convertToArray(data[keys[i]]);
                }
        }
    }
    return query
};

/**
 * Order By
 * 
 * @param {*} attributes 
 * @param {*} data 
 * @returns 
 */
const getOrderBy = (attributes, data) => {
    let order = data.order || Constants.DESC;
    let orderBy = data.orderBy || 'createdAt';

    let classAttributes = attributes;
    if (classAttributes.hasOwnProperty(orderBy) &&
        [DataTypes.NUMBER, DataTypes.DATE].includes(classAttributes[orderBy])
    ) {
        return [[orderBy, order]];
    }
    return []
};

const getPage = (data) => {
    if (!isNaN(data.page)) {
        return data.page
    }
    return Constants.DEFAULT_PAGE;
};

const getSize = (data) => {
    if (!isNaN(data.size)) {
        return data.size;
    }
    return Constants.DEFAULT_SIZE;
};

module.exports = {
    CreateValidation,
    UpdateValidation,
    DeleteValidation,

    getSize,
    getPage,

    getQueryByData
}

