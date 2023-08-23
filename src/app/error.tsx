'use client' // Error components must be Client Components

import { useEffect } from 'react'

export default function Error({
    error,
    reset,

}: {
    error: Error
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.log(error)
    }, [error])

    return (

        <div className="grid h-screen px-4 bg-white place-content-center">
            <div className="text-center">
                {/* <h1 className="font-black text-gray-200 text-9xl">401</h1> */}

                {/* <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Unauthroized!
                </p> */}

                <p className="mt-4 text-gray-500">
                    {error.message || 'Ops! Algo deu errado.'}
                </p>

                <button
                    type="button"
                    className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-primary rounded hover:bg-indigo-700 focus:outline-none focus:ring"
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                >
                    Tentar novamente
                </button>
            </div>
        </div>
    )
}