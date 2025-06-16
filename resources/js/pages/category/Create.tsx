
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Label } from '@radix-ui/react-label';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create a Category',
        href: '/categories/create',
    },
];


export default function Create() {

 const { data, setData, post, processing, errors, reset } = useForm({
    category_name: '',
    category_description: '',
  });



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(data);

    post(route('category.store'), {
      preserveScroll: true,
      onSuccess: () => {
        reset('category_name', 'category_description');
      },
    });
  };


    return (
       <AppLayout breadcrumbs={breadcrumbs}>
      <form onSubmit={handleSubmit}>

        <Head title="Create a Category" />
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
          <Button type='submit' disabled={processing}>Add Category</Button>
        </div>
      </form>
    </AppLayout>
    );
}
