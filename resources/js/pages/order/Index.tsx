import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { SquareCheckBig } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from 'react';


interface Order {
    id: number,
    customer_id: number,
    order_number: string,
    item: string,
    qty: string,
    price: string,
    payment_method: string,
}


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Order',
        href: '/orders',
    },
];

export default function Index() {

 const { flash } = usePage<{ flash: { message?: string } }>().props;
    const [showFlash, setShowFlash] = useState(false);
    const { orders = [] } = usePage<{ orders?: Order[] }>().props;

     useEffect(() => {
        if (flash.message) {
          setShowFlash(true);
          const timer = setTimeout(() => {
            setShowFlash(false);
          }, 2000);

          return () => clearTimeout(timer);
        }
      }, [flash.message]);

    const {processing, delete: destroy } = useForm({});

    const handleDelete = (id: number, category_name: string) =>{

        if(confirm(`Do you want to delete?  ${category_name}`)){
           destroy(route('category.destroy', id));
        }
      }



    return (
    <AppLayout breadcrumbs={breadcrumbs}>
         <Head title="Order" />
            <div className='m-4'>
                <Link href={route('order.create')}><Button>Add Order</Button></Link>
            </div>
            {flash.message && showFlash && (
                <div className="m-3 mb-4 flex w-full max-w-2xl items-center gap-2 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700 transition-opacity duration-300">
                    <SquareCheckBig size={18} />
                    {flash.message}
                </div>
            )}

            {orders.length > 0 ? (
                <Table className="w-full lg:w-8/12">
                    <TableCaption>A list of your orders.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[150px]">Customer ID</TableHead>
                            <TableHead className="w-[100px]">Order No.</TableHead>
                            <TableHead className="w-[100px]">Item</TableHead>
                            <TableHead className="w-[200px]">Qty</TableHead>
                            <TableHead className="w-[200px]">Price</TableHead>
                            <TableHead className="w-[200px]">Payment Method</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium">{order.customer_id}</TableCell>
                                <TableCell>{order.order_number}</TableCell>
                                <TableCell>{order.item}</TableCell>
                                <TableCell>{order.qty}</TableCell>
                                <TableCell>{order.price}</TableCell>
                                <TableCell>{order.payment_method}</TableCell>
                                <TableCell className="space-x-1 text-right">
                                    <Link href={route('order.edit', order.id)}>
                                        <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button
                                        disabled={processing}
                                        onClick={() => handleDelete(order.id, order.order_number)}
                                        variant="destructive"
                                        size="sm"
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <div className="m-4 text-center text-gray-500">
                    <p>No orders found. Create your first product!</p>
                </div>
            )}
        </AppLayout>
    );
}
