export interface Category {
    id: number;
    name: string;
    description: string;
    active?: boolean
}

// TODO: kui hiljem reha CategoryDTO, siis tuleks "active" maha võtta (nii BE kui FE)