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

interface Category {
    id: number,
    category_name: string,
    category_description: string,
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Category',
        href: '/categories',
    },
];

export default function Index() {
    const { flash } = usePage<{ flash: { message?: string } }>().props;
    const [showFlash, setShowFlash] = useState(false);
    const { categories = [] } = usePage<{ categories?: Category[] }>().props;

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
            <Head title="Category" />
            <div className='m-4'>
                <Link href={route('category.create')}>
                    <Button>Add Category</Button>
                </Link>
            </div>
           {flash.message && showFlash && (
            <div className="m-3 w-6/12 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 transition-opacity duration-300 flex items-center gap-2">
                <SquareCheckBig size={18} />
                {flash.message}
            </div>
            )}
            {categories && categories.length > 0 && (
                <Table className='w-6/12'>
                    <TableCaption>A list of your categories.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Category Name</TableHead>
                            <TableHead className="w-[100px]">Category Description</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell className="font-medium">{category.category_name}</TableCell>
                                <TableCell>{category.category_description}</TableCell>
                                <TableCell className="text-right space-x-1">
                                    <Link href={route('category.edit', category.id)}><Button className='bg-blue-600 hover:bg-blue-700' size="sm">Edit</Button></Link>
                                    <Button disabled={processing} onClick={() => handleDelete(category.id, category.category_name)}  variant="destructive" size="sm">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            {(!categories || categories.length === 0) && (
                <div className="m-4 text-center text-gray-500">
                    <p>No categories found. Create your first category!</p>
                </div>
            )}
        </AppLayout>
    );
}
