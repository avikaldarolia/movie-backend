const utils = require('../../utils/utils');
const _ = require('lodash')
const models = require('../../models/index');

const GenericFunctions = require('../Generic/Functions');
const Constants = require('./Constants');

/**
 * Create the entry into the table
 * 
 * @param {map of table fields} data 
 * @param {*} options 
 * @returns return the create query response
 */
const Create = async (data, options) => {
    let validData = GenericFunctions.CreateValidation(data, Constants.Attributes)
    if (!validData.success) {
        return utils.classResponse(validData.success, validData.data, validData.err)
    }
    let createResponse = utils.parseSafe(await models[Constants.Name].create(validData.data, options))
    let classAttributesKeys = Object.keys(Constants.Attributes)
    createResponse = _.assign({}, _.pick(createResponse, classAttributesKeys));

    return utils.classResponse(true, createResponse, '');
};

/**
 * Get query along with query parameter and dl
 * 
 * @param {Object} data || dl represent include level of the query
 * @param {*} options 
 * @returns table data w.r.t query parameters
 */
const Get = async (data, options) => {
    let includeTables = []
    let query = GenericFunctions.getQueryByData(data, Constants.Attributes, includeTables, options);
    let [dbData, count] = await Promise.all([
        models[Constants.Name].findAll(query),
        models[Constants.Name].count({ where: query.where })
    ])
    dbData = utils.parseSafe(dbData)

    return utils.classResponse(true, { count: count, rows: dbData }, '');
};

/**
 * Update the entry into the table
 * 
 * @param {map of table fields} data || also include dataId
 * @param {*} options 
 * @returns return the update query response
 */



/**
 * Update the entry into table
 * @param {*} data 
 * @param {*} options 
 * @returns 
 */
const Update = async (data, options) => {
    let updateBy = data.updateBy || 'id';
    let validData = GenericFunctions.UpdateValidation(data, Constants.Attributes, updateBy)
    if (!validData.success) {
        return utils.classResponse(validData.success, validData.data, validData.err)
    }
    let updateResponse = await models[Constants.Name].update(validData.data.data, validData.data.query);

    return utils.classResponse(true, updateResponse, "")
};

/**
 * Delete query along with query parameter
 * 
 * @param {query parameter for serching of rows} data
 * @param {*} options 
 * @returns return the delete query response
 */
const Delete = async (data, options) => {
    let deleteBy = data.deleteBy || 'id';
    let validData = GenericFunctions.DeleteValidation(data, Constants.Attributes, deleteBy)
    if (!validData.success) {
        return utils.classResponse(validData.success, validData.data, validData.err)
    }
    let deleteResponse = await models[Constants.Name].destroy(validData.data, options);

    return utils.classResponse(true, deleteResponse, '')
};

/**
 * Get user by ID
 * @param {*} id id of the user
 * @param {*} options 
 * @returns 
 */
const GetById = async (id, options = {}) => {
    let query = {
        id: id
    };
    let getResponse = await Get(query, options);
    return getResponse.data.rows[0] || {};
};

/**
 * Get user by Email
 * @param {*} email email of the user
 * @param {*} options 
 * @returns 
 */
const GetByEmail = async (email, options = {}) => {
    let getData = await models.User.findOne({
        where: {
            email: email
        }
    });
    getData = utils.parseSafe(getData);

    return getData || {}
}

module.exports = {
    Create,
    Update,
    Get,
    Delete,
    GetById,
    GetByEmail
};