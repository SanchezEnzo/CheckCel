
import { useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Component() {
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    found: boolean
    message: string
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      const found = Math.random() > 0.5
      setResult({
        found,
        message: found
          ? 'Este número está registrado en la base de datos.'
          : 'Este número no está registrado en la base de datos.'
      })
    } catch (error) {
      setResult({
        found: false,
        message: 'Error al buscar el número. Por favor, intente nuevamente.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className='min-h-screen bg-[#b4a7ed] flex flex-col items-center px-4 py-12'>
      <h1 className='text-4xl md:text-5xl font-bold mb-4'>CheckCel</h1>
      <p className='text-lg mb-8'>Sé prevenido/a, no caigas.</p>

      <form
        onSubmit={handleSubmit}
        className='w-full max-w-md flex flex-col gap-4'
      >
        <div className='flex gap-2'>
          <Input
            type='tel'
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder='Ej: 01133451908 o 225647322'
            pattern='[0-9]*'
            className='bg-[#e8ffd6] border-none text-black placeholder:text-gray-600'
            required
          />
          <Button
            type='submit'
            disabled={loading || phone.length < 8}
            className='bg-[#000000bb] hover:bg-gray-800 rounded-r-xl'
          >
            <Search className='h-4 w-4 text-white' />
            <span className='sr-only'>Buscar</span>
          </Button>
        </div>

        {result && (
          <div
            className={`flex w-full justify-center items-center p-4 outline outline-[0.5px] rounded-xl ${result.found ? 'bg-neutral-800 outline-neutral-600' : 'bg-lime-200 outline-lime-200'} `}
          >
            <p
              className={`${result.found ? 'text-red-500' : 'text-green-800'} w-full text-center`}
            >
              {result.message}
            </p>
          </div>
        )}
      </form>
    </main>
  )
}
