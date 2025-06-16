
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Label } from '@radix-ui/react-label';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create a Product',
        href: '/products/create',
    },
];


export default function Create() {

     const { data, setData, post, processing, errors, reset } = useForm({
        product_name: '',
        price: '',
        quantity: '',
        description: ''
      });

    const productSumbit = (e: React.FormEvent) => {

        e.preventDefault();
        console.log(data);

        post(route('product.store'), {
        preserveScroll: true,
        onSuccess: () => {
            reset('product_name', 'price', 'quantity', 'description');
        },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <form onSubmit={productSumbit}>
                 <Head title="Create a Product" />
                    <div className='m-3 w-5/12'>
                        <Label htmlFor='Product name'>Product name</Label>
                        <Input placeholder='Product name'value={data.product_name} onChange={(e) => setData('product_name', e.target.value)}></Input>
                        {errors.product_name && <div className='text-red-400'>{errors.product_name}</div>}
                    </div>
                    <div className='m-3 w-5/12'>
                        <Label htmlFor='Price'>Price</Label>
                        <Input placeholder='Price' value={data.price} onChange={(e) => setData('price', e.target.value)}></Input>
                       {errors.price && <div className='text-red-400'>{errors.price}</div>}
                    </div>

                    <div className='m-3 w-5/12'>
                        <Label htmlFor='Quantity'>Qty</Label>
                        <Input placeholder='Quantity' value={data.quantity} onChange={(e) => setData('quantity', e.target.value)}></Input>
                          {errors.quantity && <div className='text-red-400'>{errors.quantity}</div>}
                    </div>

                    {/* <div className='m-3 w-5/12'>
                        <Label htmlFor='Orginal Price'>Orginal Price</Label>
                        <Input placeholder='Orginal Price'  value={data.original_price} onChange={(e) => setData('original_price', e.target.value)}></Input>
                    </div> */}

                    <div className='m-3 w-5/12'>
                        <Label htmlFor='Product description'>Product description</Label>
                        <Textarea placeholder='Product description' value={data.description} onChange={(e) => setData('description', e.target.value)}></Textarea>
                       {errors.description && <div className='text-red-400'>{errors.description}</div>}
                    </div>
                    <div className='m-3 w-5/12'>
                        <Button type='submit' disabled={processing}>Add Product</Button>
                    </div>
            </form>
        </AppLayout>
    );
}
