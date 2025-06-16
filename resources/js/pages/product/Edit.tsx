
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Label } from '@radix-ui/react-label';

    interface Product {
        id: number,
        product_name: string,
        quantity: number,
        price: number;
        description: string
    }

    interface ProductProps{
    product: Product
    }


export default function Edit({product}: ProductProps) {

 const { data, setData, put, processing, errors, reset } = useForm({
     product_name: product.product_name,
     quantity: product.quantity,
     price: product.price,
     description: product.description,

  });


  const handleUpdate= (e: React.FormEvent) => {
    e.preventDefault();
    console.log(data);

    put(route('product.update', product.id), {
      preserveScroll: true,
      onSuccess: () => {
        reset('product_name', 'quantity', 'price', 'description');
      },
    });
  };

  return (
    <AppLayout breadcrumbs={[{title: 'Edit a Product', href: `/products/${product.id}/edit` }]}>
            <form onSubmit={handleUpdate}>
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


                    <div className='m-3 w-5/12'>
                        <Label htmlFor='Product description'>Product description</Label>
                        <Textarea placeholder='Product description' value={data.description} onChange={(e) => setData('description', e.target.value)}></Textarea>
                       {errors.description && <div className='text-red-400'>{errors.description}</div>}
                    </div>
                    <div className='m-3 w-5/12'>
                        <Button type='submit' disabled={processing}>Update Product</Button>
                    </div>
            </form>
        </AppLayout>
    );
}
