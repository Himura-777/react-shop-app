import Banner from '../components/Banner.jsx'
import TopSales from '../components/TopSales.jsx'
import Catalog from '../components/Catalog.jsx'

export default function Home(){
  return (
    <div className="row">
      <div className="col" style={{flexBasis:'100%'}}>
        <Banner />
        <TopSales />
        <Catalog />
      </div>
    </div>
  )
}
