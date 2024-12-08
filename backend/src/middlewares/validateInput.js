

const validateInput = (fields) => (req, res, next) => {
    const body =  req.body

    
    const missingFields = fields.filter((field) => !req.body.hasOwnProperty(field));


    return missingFields.length ?
    res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` }) : next()
}


module.exports = validateInput;
