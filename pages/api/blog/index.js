
export default async ( req , res , next ) => {
    res.send( await api.blog.list() );
};