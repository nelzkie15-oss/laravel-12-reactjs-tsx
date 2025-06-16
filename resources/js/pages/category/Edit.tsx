
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Label } from '@radix-ui/react-label';
import { useState, useEffect } from 'react';
import { SquareCheckBig } from 'lucide-react';


    interface Category {
        id: number,
        category_name: string,
        category_description: string,
    }

    interface CategoryProps{
    category: Category
    }


export default function Edit({category}: CategoryProps) {
  const { flash } = usePage<{ flash: { message?: string } }>().props;
  const [showFlash, setShowFlash] = useState(false);

 const { data, setData, put, processing, errors, reset } = useForm({
    category_name: category.category_name,
    category_description: category.category_description,
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

  const handleUpdate= (e: React.FormEvent) => {
    e.preventDefault();
    console.log(data);

    put(route('category.update', category.id), {
      preserveScroll: true,
      onSuccess: () => {
        reset('category_name', 'category_description');
      },
    });
  };


    return (
    <AppLayout breadcrumbs={[{title: 'Edit a Product', href: `/categories/${category.id}/edit` }]}>
      <form onSubmit={handleUpdate}>
          {flash.message && showFlash && (
            <div className="m-3 w-5/12 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 transition-opacity duration-300 flex items-center gap-2">
                <SquareCheckBig size={18} />
                {flash.message}
            </div>
            )}
        <Head title="Update a Category" />
        <div className='m-3 w-5/12'>
          <Label htmlFor='Category name'>Category name</Label>
          <Input
            placeholder='Category name'
            value={data.category_name}
            onChange={(e) => setData('category_name', e.target.value)}
          />
          {errors.category_name && <div className='text-red-400'>{errors.category_name}</div>}
        </div>

        <div className='m-3 w-5/12'>
          <Label htmlFor='Category description'>Category description</Label>
          <Textarea
            placeholder='Category description'
            value={data.category_description}
            onChange={(e) => setData('category_description', e.target.value)}
          />
          {errors.category_description && <div className='text-red-400'>{errors.category_description}</div>}
        </div>

        <div className='m-3 w-5/12'>
          <Button type='submit' disabled={processing}>Update Category</Button>
        </div>
      </form>
    </AppLayout>
    );
}
