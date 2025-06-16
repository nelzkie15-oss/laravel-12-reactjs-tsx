import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Label } from '@radix-ui/react-label';
import { SquareCheckBig } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Order {
    id: number;
    customer_id: string;
    order_number: string;
    item: string;
    qty: string;
    price: string;
    payment_method: string;
}

interface OrderProps {
    order: Order;
}

export default function Edit({ order }: OrderProps) {
    const { flash } = usePage<{ flash: { message?: string } }>().props;
    const [showFlash, setShowFlash] = useState(false);

    const { data, setData, put, processing, errors, reset } = useForm({
        customer_id: order.customer_id,
        order_number: order.order_number,
        item: order.item,
        qty: order.qty,
        price: order.price,
        payment_method: order.payment_method,
    });

    useEffect(() => {
        if (flash.message) {
            setShowFlash(true);
            const timer = setTimeout(() => {
                setShowFlash(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [flash.message]);

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(data);

        put(route('order.update', order.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset('customer_id', 'order_number', 'item', 'qty', 'price', 'payment_method');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Edit a Order', href: `/categories/${order.id}/edit` }]}>
            <form onSubmit={handleUpdate}>
                {flash.message && showFlash && (
                    <div className="m-3 mb-4 flex w-5/12 items-center gap-2 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700 transition-opacity duration-300">
                        <SquareCheckBig size={18} />
                        {flash.message}
                    </div>
                )}
                <Head title="Create a Category" />
                <div className="m-3 w-5/12">
                    <Label htmlFor="Customer name">Customer name</Label>
                    <Input placeholder="Category name" value={data.customer_id} onChange={(e) => setData('customer_id', e.target.value)} />
                    {errors.customer_id && <div className="text-red-400">{errors.customer_id}</div>}
                </div>
                <div className="m-3 w-5/12">
                    <Label htmlFor="Order Number">Order Number</Label>
                    <Input placeholder="Order Number" value={data.order_number} onChange={(e) => setData('order_number', e.target.value)}></Input>
                    {errors.order_number && <div className="text-red-400">{errors.order_number}</div>}
                </div>
                <div className="m-3 w-5/12">
                    <Label htmlFor="Item">Item</Label>
                    <Input placeholder="Item" value={data.item} onChange={(e) => setData('item', e.target.value)}></Input>
                    {errors.item && <div className="text-red-400">{errors.item}</div>}
                </div>
                <div className="m-3 w-5/12">
                    <Label htmlFor="Price">Price</Label>
                    <Input placeholder="Price" value={data.price} onChange={(e) => setData('price', e.target.value)}></Input>
                    {errors.price && <div className="text-red-400">{errors.price}</div>}
                </div>
                <div className="m-3 w-5/12">
                    <Label htmlFor="Payment method">Payment method</Label>
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
                    {errors.payment_method && <div className="text-red-400">{errors.payment_method}</div>}
                </div>

                <div className="m-3 w-5/12">
                    <Button type="submit" disabled={processing}>
                        Update Category
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}
