const moment = require('moment')
const axios = require('axios');
const i18n = require('i18n');
/**
 * Async middleware to use await and async calls in express middleware ( For Controllers)
 * @param {*} fn Function
 * @returns 
 */
const asyncMiddleware = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

/**
 * Send response back to the user
 * @param {*} req Request that came
 * @param {*} res Response to be sent 
 * @param {*} success  If the request was a success or not 
 * @param {*} data Any Data to be return
 * @param {*} err Error if any in the data
 */
const sendResponse = (req, res, success, data, err) => {
    return res.json({
        success,
        data,
        error: err
    });
}


/**
 * Check if data is empty
 *
 * @param data
 * @returns {boolean}
 */
const empty = (data) => {
    if (typeof (data) === 'number' || typeof (data) === 'boolean') {
        return false;
    }
    if (typeof (data) === 'undefined' || data === null) {
        return true;
    }
    if (typeof (data.length) !== 'undefined') {
        return data.length === 0;
    }
    for (let i in data) {
        if (data.hasOwnProperty(i)) {
            return false;
        }
    }
    return true;
};

const isLocalEnvironment = () => {
    return process.env.NODE_ENV === 'local';
}

const isProdEnvironment = () => {
    return process.env.NODE_ENV === 'production';
}

const isDevEnvironment = () => {
    return process.env.NODE_ENV === 'dev';
}

/**
 * Default response from any function to be sent back so that it is known if the function ran successfully 
 * And if it did then what was the data that was there
 * @param {Boolean} success 
 * @param {*} data 
 * @param {*} err 
 * @returns 
 */
const classResponse = (success, data, err) => {
    return {
        success,
        data,
        err
    }
}

/**
 * Make request using Request promise module
 * 
 * @param {String} url URL of the request
 * @param {String} method Method of the request to be made GET,POST,PUT etc
 * @param {Object} headers Headers of the request to be sent 
 * @param {Object} body Body containing 
 * 
 * @returns {Promise<{success: boolean, data: {}, error: string}>}
 */
const makeAxiosRequest = async (url, method, headers = {}, body = '', auth = '') => {
    let response = {
        success: true,
        data: {},
        err: ''
    };

    let params = {
        url: url,
        method: method,
        headers: headers,
        data: body,
        json: true
    };
    if (auth != "") {
        params.auth = auth;
    }

    try {
        let axiosResponse = await axios(params);
        response.data = axiosResponse.data;
    } catch (err) {
        let axiosError = err.response;
        response.success = false;
        response.err = axiosError;
    }

    return response
};

/**
 * Get Pagination from a query
 * @param {*} query 
 * @returns 
 */
const getPagination = (query) => {
    if (query.hasOwnProperty('page') && query.hasOwnProperty('size')) {
        return {
            page: query.page,
            size: query.size
        }
    }
    return {
        page: 1,
        size: 5
    }
}

/**
 * Safely parse the data
 *
 * @param data
 * @returns {any}
 */
const parseSafe = (data) => {
    return JSON.parse(JSON.stringify(data));
};

/**
 * Get date in the standard format used across the app
 * @param {*} date 
 * @param {*} timeOffSet 
 * @returns 
 */
const getFormattedDate = (date, timeOffSet = "+05:30", format = "LLL") => {
    return moment(date).utcOffset(timeOffSet).format(format)
}
/**
 * Safely parse the data
 *
 * @param data
 * @returns {any}
 */
const parseJSON = (data) => {
    try {
        return JSON.parse(data)
    } catch (err) {
        return data
    }
};

const geti18String = (tag, localeCode = 'en', subs = {}) => {
    return i18n.__({ phrase: tag, locale: localeCode }, subs)
}

/**
 * Generate OTP
 */
const generateOTP = async () => {
    return Math.floor(100000 + Math.random() * 900000);
};

const errorHandler = async (err, req, res, next) => {
    try {
        console.log("Error in errorHandler: ", req.url, req.body, err);
        let response = {
            success: false,
            data: {},
            error: err || 'Something went wrong'
        };
        res.send(response)
    } catch (err) {
        next(err)
    }
};

/**
 * Get Date int utc format in indian time
 * 
 * @param {*} date 
 * @param {*} format 
 */
const getISTStartDate = (date, format = 'MM-DD-YYYY', startOf = 'day', subtract = 0, subtractUnit = 'day') => {
    if (startOf === 'week') {
        startOf = 'isoWeek'
    }
    return moment(date, format).utcOffset("+05:30").subtract(subtract, subtractUnit).startOf(startOf).utc()
}

/**
 * Get Date int utc format in indian time
 * 
 * @param {*} date 
 * @param {*} format 
 */
const getISTEndDate = (date, format = 'MM-DD-YYYY', endOf = 'day', add = 0, addUnit = 'day') => {
    if (endOf === 'week') {
        endOf = 'isoWeek'
    }
    return moment(date, format).utcOffset("+05:30").add(add, addUnit).endOf(endOf).utc()
}


module.exports = {
    isDevEnvironment,
    isLocalEnvironment,
    isProdEnvironment,

    asyncMiddleware,
    classResponse,
    sendResponse,
    makeAxiosRequest,
    parseSafe,
    parseJSON,
    empty,
    errorHandler,
    generateOTP,
    geti18String,
    getFormattedDate,
    getISTStartDate,
    getISTEndDate,
    getPagination
}