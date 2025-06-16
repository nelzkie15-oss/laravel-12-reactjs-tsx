
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Label } from '@radix-ui/react-label';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create a Order',
        href: '/orders/create',
    },
];

export default function Create() {

     const { data, setData, post, processing, errors, reset } = useForm({
        customer_id: '',
        order_number: '',
        item: '',
        price: '',
        payment_method: '',
      });

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            console.log(data);

            post(route('order.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset('customer_id', 'order_number', 'item', 'price', 'payment_method');
            },
            });
        };



    return (
        <AppLayout breadcrumbs={breadcrumbs}>
          <form onSubmit={handleSubmit}>
              <Head title="Create a Category" />
                    <div className='m-3 w-5/12'>
                        <Label htmlFor='Customer name'>Customer name</Label>
                        <Input placeholder='Customer name' value={data.customer_id} onChange={(e) =>setData('customer_id', e.target.value)}></Input>
                      {errors.customer_id && <div className='text-red-400'>{errors.customer_id}</div>}
                    </div>
                    <div className='m-3 w-5/12'>
                        <Label htmlFor='Order Number'>Order Number</Label>
                        <Input placeholder='Order Number' value={data.order_number} onChange={(e) => setData('order_number', e.target.value)}></Input>
                    {errors.order_number && <div className='text-red-400'>{errors.order_number}</div>}
                    </div>
                    <div className='m-3 w-5/12'>
                        <Label htmlFor='Item'>Item</Label>
                        <Input placeholder='Item' value={data.item} onChange={(e) => setData('item', e.target.value)}></Input>
                    {errors.item && <div className='text-red-400'>{errors.item}</div>}
                    </div>
                    <div className='m-3 w-5/12'>
                        <Label htmlFor='Price'>Price</Label>
                        <Input placeholder='Price' value={data.price} onChange={(e) => setData('price', e.target.value)}></Input>
                     {errors.price && <div className='text-red-400'>{errors.price}</div>}
                     </div>
                      <div className='m-3 w-5/12'>
                        <Label htmlFor='Payment method'>Payment method</Label>
                        <Select value={data.payment_method} onValueChange={(value) => setData('payment_method', value)}>
                        <SelectTrigger className="w-[380px]">
                            <SelectValue placeholder="Select Payment Method" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Cash">Cash</SelectItem>
                            <SelectItem value="Gcash">Gcash</SelectItem>
                            <SelectItem value="Paymaya">Paymaya</SelectItem>
                        </SelectContent>
                        </Select>
                        {errors.payment_method && <div className='text-red-400'>{errors.payment_method}</div>}
                    </div>

                    <div className='m-3 w-5/12'>
                        <Button type='submit' disabled={processing}>Add Order</Button>
                    </div>
          </form>
        </AppLayout>
    );
}

