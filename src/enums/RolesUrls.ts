import {Role} from "./Roles";


/*interface roleUrl {
    role: [Role],
    url: string
}*/

class RolesUrls {
    id;
    role;
    urls ;
    constructor() {
    }

    getUrl(id, role) {
        this.id = id
        this.role = role
        this.urls = [
            {role: Role.ADMIN, url: '/menu/orders'},
            {role: Role.USER, url: `/myOffice/${this.id}`},
            {role: Role.MASTER, url: `/MyWorkplace/${this.id}`},
        ]
        this.urls.map((oneRole) => console.log(typeof oneRole.role))
        const correctObject = this.urls.filter((oneRole) => oneRole.role === this.role)
        if (!correctObject) return
        return correctObject[0].url
    }
}

export default RolesUrls