// ============================================================
// TYPES — matching Supabase get_wallet_model_config response
// ============================================================

export type OptionValue = {
    id: number;
    option_id: number;
    model_option_id: number;
    display_name: string;
    mesh_variant: string;       // material name in GLB e.g. "BLACK_LEATHER"
    material_id: number;
    material_color_code: string;
    material_color_name: string;
    price_adjustment: number;
    thumbnail_url: string | null;
    is_active: boolean;
    display_order: number;
};

export type Option = {
    id: number;
    model_option_id: number;
    option_key: string;         // mesh name in GLB e.g. "BACK_PANEL"
    display_name: string;
    description: string;
    is_required: boolean;
    display_order: number;
    values: OptionValue[];
};

export type ModelComponent = {
    id: number;
    wallet_model_id: number;
    component_key: string;
    display_name: string;
    mesh_name: string;
    component_type: string;
    is_active: boolean;
    display_order: number;
};

export type WalletModelData = {
    id: number;
    name: string;
    glb_url: string;
    glb_components: string[];
    base_price: number;
    is_active: boolean;
    gender_category: string;
};

export type ConfigResponse = {
    model: WalletModelData;
    components: ModelComponent[];
    options: Option[];
    materials: Material[];
};

export type Material = {
    id: number;
    type: "outer" | "inner" | "thread";
    color_name: string;
    color_code: string;
    image_url: string | null;
    price_adjustment: number;
};

// Per option, which value is selected (null = mesh hidden / not chosen)
export type SelectionState = Record<number, OptionValue | null>;
