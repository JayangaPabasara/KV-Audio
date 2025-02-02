export function isAdmin(req){
    let isAdmin = false;

    if(req.user != null && req.user.role == 'admin' ){
            isAdmin = true;
    }

    return isAdmin;
}

export function isCustomer(req){
    let isCustomer = false

    if(req.user != null && req.user.role == 'customer'){
        isCustomer = true
    }

    return isCustomer
}