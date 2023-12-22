import {unstable_noStore as noStore} from 'next/cache'
import prisma from "@/lib/db/prisma";
import {Product} from ".prisma/client";


//categories
export async function fetchProductCategories() {
    noStore()
    try {
        return await prisma.productCategory.findMany()
    } catch (e) {
        console.error('Error fetching products:', e)
        throw new Error('Failed to fetch products.')
    }

}

export async function fetchProductCategoriesWithProducts() {
    noStore()
    try {
        return await prisma.productCategory.findMany({
            include: {products: true}
        })
    } catch (e) {
        console.error('Error fetching products:', e)
        throw new Error('Failed to fetch products.')
    }

}

// Products
export async function fetchProducts() {
    noStore()
    try {
        return await prisma.product.findMany()
    } catch (e) {
        console.error('Error fetching products:', e)
        throw new Error('Failed to fetch products.')
    }

}

export async function fetchProductsByCategoryId(categoryId: string) {
    noStore()
    try {
        const data: Product[] = await prisma.product.findMany({
            where: {productCategoryId: categoryId},
            include: {images: true},
        })
        return data
    } catch (e) {
        console.error('Error fetching products:', e)
        throw new Error('Failed to fetch products.')
    }

}
