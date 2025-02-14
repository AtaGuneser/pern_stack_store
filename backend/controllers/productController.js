import sql from "../config/db";

export const getProducts = async (req, res) => {
    try {
        const products = await sql`
        SELECT * FROM products
        ORDER BY created_at DESC    
        `;
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const createProduct = async (req, res) => {
    const { name, image, price } = req.body;
    if (!name || !image || !price) {
        return res.status(400).json({
            success: false,
            message: "Name, image, and price are required"
        });
    }
    try {
        const newProduct = await sql`INSERT INTO products (name, image, price) VALUES (${name}, ${image}, ${price})
        RETURNING *
        `;
        res.status(201).json({ success: true, data: newProduct[0] });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const getProduct = async (req, res) => {

};

export const updateProduct = async (req, res) => {

};

export const deleteProduct = async (req, res) => {

};