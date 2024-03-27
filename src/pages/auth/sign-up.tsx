import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import InputMask from 'react-input-mask'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const schema = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
})

type SignUpFormInputs = z.infer<typeof schema>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(schema),
  })

  async function handleSubmitSignUp(data: SignUpFormInputs) {
    try {
      console.log(data)

      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success('Restaurante cadastrado com sucesso!', {
        action: {
          label: 'Login',
          onClick: () => navigate('/sign-in'),
        },
      })
    } catch (error) {
      toast.error('Erro ao cadastrar restaurante.')
    }
  }

  function onChangePhoneInput(e: any) {
    const value = e.target.value.replace(/[^\d]/g, '')
    e.target.value = value
  }

  return (
    <>
      <Helmet title="Cadastro" />

      <div className="p-8">
        <Button asChild variant="outline" className="absolute right-8 top-8">
          <Link to="/sign-in">Fazer login</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja parceiro e comece suas vendas!
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleSubmitSignUp)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
              <Input type="text" {...register('restaurantName')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input type="text" {...register('managerName')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input type="email" {...register('email')} />
              {errors.email && <span>{errors.email.message}</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Seu celular</Label>
              <InputMask
                mask="(99) 99999-9999"
                placeholder="(99) 99999-9999"
                maskChar="_"
                onChange={onChangePhoneInput}
                {...register('phone', { required: true })}
              >
                {(inputProps) => <Input {...inputProps} />}
              </InputMask>
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Finalizar cadastro
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
