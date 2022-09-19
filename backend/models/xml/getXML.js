const {httpClient} = require("../../common/httpClient");
const {genericError} = require("../../utils/fns");
const cc = console.log;

exports.getXML = async (req, res) => {
    try {
        await httpClient.get(req.body.feedURL).then((axiosResponse) => {
            feedResponse = axiosResponse;
        });
    } catch (error) {
        return genericError(res, "", error);
    }

    if (!feedResponse?.data) {
        return genericError(res, "Remote server did not return any data.")
    }

    return feedResponse;
}

