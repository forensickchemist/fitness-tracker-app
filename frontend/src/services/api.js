const API_URL = import.meta.env.VITE_API_URL

export async function apiRequest(endpoint, options = {}) {
  if (!API_URL) {
    throw new Error(
      'API URL is not configured. Please check your VITE_API_URL environment variable.'
    )
  }

  const token = localStorage.getItem('accessToken')

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })

  // Safely handle responses that may not contain JSON
  const contentType = response.headers.get('content-type')

  let data = null

  if (contentType?.includes('application/json')) {
    data = await response.json()
  } else {
    const text = await response.text()
    data = text ? { message: text } : null
  }

  if (!response.ok) {
    throw new Error(
      data?.message || `Request failed with status ${response.status}`
    )
  }

  return data
}

