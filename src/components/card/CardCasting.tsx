import './card.scss'
import type { Cast } from '../../types'

interface CardCastingProps {
  casting: Cast
}

const CardCasting: React.FC<CardCastingProps> = ({ casting }) => {
  return (
    <div className="card__casting d-flex flex-column align-items-center justify-content-center gap-2 font__color">
      <div className="image__casting">
        <img
          src={`${import.meta.env.VITE_IMG_URL}/${casting.profile_path}`}
          alt="actor"
          className="image__casting2"
        />
      </div>
      <div className="body__card__casting">
        <div className="name_actor">{casting.name.slice(0, 12)}</div>
      </div>
    </div>
  )
}

export default CardCasting