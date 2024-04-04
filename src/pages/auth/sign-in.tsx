import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { Link, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'

import { signIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const schema = z.object({
  email: z.string().email(),
})

type SignInFormInputs = z.infer<typeof schema>

export function SignIn() {
  const [searchParams] = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  async function handleSubmitSignIn(data: SignInFormInputs) {
    try {
      await authenticate({ email: data.email })

      toast.success('Enviamos um link de autenticação para seu e-mail.', {
        action: {
          label: 'Reenviar',
          onClick: () => {
            handleSubmitSignIn(data)
          },
        },
      })
    } catch (error) {
      toast.error('Credenciais inválidas.')
    }
  }

  return (
    <>
      <Helmet title='Login' />

      <div className='p-8'>
        <Button asChild variant='outline' className='absolute right-8 top-8'>
          <Link to='/sign-up'>Criar novo estabelecimento</Link>
        </Button>

        <div className='flex w-[350px] flex-col justify-center gap-6'>
          <div className='flex flex-col gap-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              Acessar painel
            </h1>
            <p className='text-sm text-muted-foreground'>
              Acompanhe suas vendas pelo painel do parceiro!
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleSubmitSignIn)}
            className='space-y-4'
          >
            <div className='space-y-2'>
              <Label htmlFor='email'>Seu e-mail</Label>
              <Input {...register('email')} type='email' />
              {errors.email && <span>{errors.email.message}</span>}
            </div>

            <Button disabled={isSubmitting} className='w-full' type='submit'>
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
