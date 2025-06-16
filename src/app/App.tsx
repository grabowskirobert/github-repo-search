import { createRoot } from 'react-dom/client'
import Listing from '@/features/listing/components/Listing/Listing.tsx'
import enableMocking from '@/utils/enableMocking.ts'
import Provider from './Provider'

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <Provider>
      <Listing />
    </Provider>
  )
})
