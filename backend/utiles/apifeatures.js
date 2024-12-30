class search {
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    search(){
       let keyword = this.queryStr.keyword ? {
            name:{
                $regex:this.queryStr.keyword,        
                $options:'i',
            }    
        }:{};
        this.query.find({...keyword});
        return this;
    }

    filter(){
        const querycopy = {...this.queryStr};
        console.log(querycopy);
        //removing fields from query
        //category filter
        const removefileds = ['keyword','limit','page'];
        removefileds.forEach(field=> delete querycopy[field])

        //price filter 
        let queryStr = JSON.stringify(querycopy);
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)/g, match =>`$${match}`);
        console.log(queryStr)
        this.query.find(JSON.parse(queryStr));

        return this
    }
    paginate(perpage){
        const curentpage = Number(this.queryStr.page || 1);
        const nextpage = perpage*curentpage - 1;
        this.query.limit(perpage).skip(nextpage);
        return this 
    }
}
module.exports = search;