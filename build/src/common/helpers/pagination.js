"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getPaginatedRecords = async (paginateRecord, { specifiedLimit = 10, sortFilter = '["created_at", -1]' }) => {
    try {
        const { limit, model, page, data, selectedFields } = paginateRecord;
        const pageLimit = Math.min(specifiedLimit, 100);
        const offset = 0 + (Math.abs(page || 1) - 1) * pageLimit;
        let result = {};
        const response = await model.find({ ...data }).countDocuments();
        result =
            Number(response) > 0
                ? await model
                    .find({ ...data })
                    .select(selectedFields ? selectedFields : "")
                    .skip(offset)
                    .limit(pageLimit)
                    .sort(sortFilter)
                : {
                    count: 0,
                    row: [],
                };
        return {
            data: result,
            pagination: {
                pageSize: limit,
                totalCount: response,
                pageCount: Math.ceil(response / limit),
                currentPage: +page,
                hasNext: page * limit < response,
            },
        };
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = getPaginatedRecords;
