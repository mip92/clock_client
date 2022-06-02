import {Role} from "./Roles";

type Urls = {
    [key in Role] :string
}

export const UrlByRole:Urls = {
    [Role.USER]: `/myOffice/`,
    [Role.MASTER]: `/MyWorkplace/`,
    [Role.ADMIN]: `/menu/orders/`,
}

