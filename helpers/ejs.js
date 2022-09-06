module.exports ={

    stripTags: function (input){
    return input.replace(/<(?:.|\n)*?>/gm,'')
    }
}