import HomeNavBar from "@/app/(homeComponents)/NavBar";
import {webPageName} from "@/lib/constants/Constants";
import Image from "next/image";
import {Product, ProductCategory} from ".prisma/client";
import Link from "next/link";
import {Button, buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {ChevronDownIcon, CoinsIcon, LayoutDashboardIcon, LucideProps} from "lucide-react";
import {Input} from "@/components/ui/input";
import React from "react";
import {fetchProductCategories, fetchProductCategoriesWithProducts, fetchProducts} from "@/lib/db/data/products-data";

const MerchandisePage = async () => {
    const product: Product = {
        amount: 1500,
        createdAt: new Date(Date.now()),
        description: "Best product ever. When asked about what shoe you could give to your darling wife, this should be the first thought in your brilliant mind. This is the shoe that shines best for their shinning feet.",
        discount: 0,
        id: "kdlnslkds",
        productCategoryId: "dkslkndlskn",
        productColorId: "dklnslkdnlskn",
        productSizeId: "dlksnlknlkdns",
        quantity: 0,
        sellerId: "kdnlksnlknds",
        updatedAt: new Date(Date.now()),
        name: 'AKG leather Shoe'
    }
    const products: Product[] = await fetchProducts() || [product, product, product]
    const category: ProductCategory = {name: 'Shoes', id: 'dsklndlslk'}
    const categories: ProductCategory[] = await fetchProductCategories()
    return <div className='flex flex-col gap-3'>
        <HomeNavBar/>
        <div className='flex gap-2 justify-between flex-wrap p-3'>
            <ProductCategorySelector category={category} categories={categories}/>
            <SearchBar/>
            <SellerManageButton/>
        </div>
        <FeatureProduct product={product}/>
        <Products/>
    </div>
}
export default MerchandisePage
export const metadata = {
    title: `${webPageName}: Merchandise sales to promote products from local businesses to sell materials that picture the petition`
}

async function Products() {
    const categories = await fetchProductCategoriesWithProducts()

    return <div>
        {
            categories.map((category) => {
                    return <div key={category.id}>
                        <span>{category.name}</span>
                        <div>
                            {
                                category.products.map((product) => (
                                    <div key={product.id}>
                                        <ProductContainer product={product}/>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                }
            )

        }
    </div>
}

function SellerManageButton() {
    const isSeller = true
    const buttonChildren: {
        name: string,
        icon: React.ForwardRefExoticComponent<LucideProps>
    } = isSeller ? {name: 'Dashboard', icon: LayoutDashboardIcon} : {
        name: 'Sell',
        icon: CoinsIcon
    }
    const ButtonIcon = buttonChildren.icon

    return (
        <Button className='flex gap-2'>
            <span>{buttonChildren.name}</span>
            <ButtonIcon/>
        </Button>
    )
}

function ProductContainer({product}: { product: Product }) {
    return <div>
        {product.name}
    </div>
}

function SearchBar() {
    return <div className='max-w-sm'>
        <Input placeholder='search here...'/>
    </div>
}

function ProductCategorySelector({category, categories}: { category: ProductCategory, categories: ProductCategory[] }) {
    return <div className='flex gap-2 items-center'>

        <DropdownMenu>
            <DropdownMenuTrigger className={buttonVariants()}>Category<ChevronDownIcon/></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Product categories</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                    {
                        categories.map((category) => (
                            <div key={category.id}>
                                <DropdownMenuCheckboxItem checked={true}
                                >{category.name}</DropdownMenuCheckboxItem>
                            </div>
                        ))
                    }
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
        <span>Shoes,Bags</span>
    </div>
}

function FeatureProduct({product}: { product: Product }) {
    const discount = (product.amount - ((product.discount!) * (product.amount) / 100))
    return <div className='flex flex-wrap md:flex-nowrap gap-2 max-w-4xl'>
        <div className='flex flex-col gap-3  p-3 w-full'>
            <Image src={''} alt={product.name} width={400} height={300} className='object-cover'/>
            <div className='flex flex-col'>
                <div className='flex gap-2 justify-center '>
                    <span className='font-sans'>{`Color`}</span>
                    <span className='font-sans'>{`Category`}</span>
                    <span className='font-sans'>{`Size`}</span>
                    <span className='font-sans'>{`Seller`}</span>
                </div>
                <div className='flex gap-2 justify-center items-center'>
                    <span
                        className={cn('font-sans text-xl md:text-2xl ', product.discount! > 0 && 'line-through text-destructive text-sm md:text-sm font-bold')}>{`${product.amount.toLocaleString()} UGX`}</span>
                    <span
                        className={cn('font-sans', product.discount === 0 && 'hidden')}>{`${product.discount}% discount`}</span>
                    <span
                        className={cn('font-sans text-xl md:text-2xl font-bold', product.discount === 0 && 'hidden')}>{`${discount.toLocaleString()} UGX`}</span>
                </div>

            </div>
        </div>

        <div className='flex flex-col gap-3  p-3 items-center justify-center'>
            <span className='text-xl md:text-2xl'>{product.name}</span>
            <span className='font-light'>{product.description}</span>
            <div>{`product Rating:Todo`}</div>
            <div className='flex gap-3 justify-end'>
                <Link href={`/merchandise/${product.id}`} className={buttonVariants({variant: 'outline'})}>View</Link>
                <Button variant='destructive'>Add to cart</Button>
            </div>
        </div>

    </div>
}

/**
 * Product Showcase:
 *
 * High-quality images of each product with detailed descriptions.
 * Categorize products (shirts, jackets, caps, flags, stickers) for easy navigation.
 * Product Pages:
 *
 * Individual pages for each product with a focus on its significance.
 * Size charts, color options, and other relevant details.
 * Shopping Cart:
 *
 * An intuitive shopping cart system where users can review and edit their orders.
 * Secure Checkout:
 *
 * Integration with secure payment gateways like PayPal, Stripe, or other trusted options.
 * SSL certification for a secure browsing experience.
 * Order Confirmation:
 *
 * Automatic confirmation emails after a successful purchase.
 * Shipping Information:
 *
 * Clear shipping details and estimated delivery times.
 * Discounts/Promotions:
 *
 * Option to apply discount codes or promotions during checkout.
 * Customer Reviews:
 *
 * A section for customers to leave reviews and feedback on purchased items.
 * Inventory Management:
 *
 * Keep track of product availability and update the website accordingly.
 * Returns/Refunds Policy:
 *
 * Clearly state the policy for returns and refunds.
 * Newsletter Signup:
 *
 * Give customers the option to subscribe to updates, promotions, and new product releases.
 * Social Media Integration:
 *
 * Share buttons on product pages to encourage customers to spread the word.
 */
