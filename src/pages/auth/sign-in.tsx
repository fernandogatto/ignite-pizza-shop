import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const schema = z.object({
  email: z.string().email(),
})

type SignInFormInputs = z.infer<typeof schema>

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormInputs>({
    resolver: zodResolver(schema),
  })

  function handleSubmitSignIn(data: SignInFormInputs) {
    console.log(data)
  }

  return (
    <>
      <Helmet title="Login" />

      <div className="p-8">
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro!
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleSubmitSignIn)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input {...register('email')} type="email" />
              {errors.email && <span>{errors.email.message}</span>}
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
