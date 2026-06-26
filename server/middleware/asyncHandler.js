const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .catch(next);
};
const login = asyncHandler(async(req,res)=>{

});

export default asyncHandler;

