'use client'

import { MapPin, MessageCircle, Navigation, Phone } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'

import styles from './LocationMap.module.css'

const phone = '+918939069135'
const whatsapp = 'https://wa.me/918939069135'
const directions =
  'https://www.google.com/maps/place/Success+Root+Technologies/data=!4m2!3m1!1s0x0:0x9c2349a6ebbe3e99'
const mapsEmbedKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY
const locationQuery =
  'Success Root Technologies, First Floor, Old No. 8/1, New No. 15/1, Rajaji Street, West Mambalam, Chennai, Tamil Nadu 600033'
const mapEmbed = mapsEmbedKey
  ? `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(mapsEmbedKey)}&q=${encodeURIComponent(locationQuery)}`
  : null

type TravelMode = 'driving' | 'transit' | 'walking'

function buildDirectionsEmbed(origin: string, mode: TravelMode) {
  if (!mapsEmbedKey || !origin) return null
  const params = new URLSearchParams({
    key: mapsEmbedKey,
    origin,
    destination: locationQuery,
    mode,
    units: 'metric',
  })
  return `https://www.google.com/maps/embed/v1/directions?${params.toString()}`
}

function buildGoogleMapsUrl(origin: string, mode: TravelMode) {
  const params = new URLSearchParams({ api: '1', destination: locationQuery, travelmode: mode })
  if (origin) params.set('origin', origin)
  return `https://www.google.com/maps/dir/?${params.toString()}`
}

export function LocationMap({ enableDirectionsPlanner = false }: { enableDirectionsPlanner?: boolean }) {
  const [startingLocation, setStartingLocation] = useState('')
  const [activeOrigin, setActiveOrigin] = useState('')
  const [travelMode, setTravelMode] = useState<TravelMode>('driving')
  const activeMap = useMemo(
    () => buildDirectionsEmbed(activeOrigin, travelMode) || mapEmbed,
    [activeOrigin, travelMode],
  )
  const openMapsUrl = buildGoogleMapsUrl(startingLocation.trim(), travelMode)

  function showDirections(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const origin = startingLocation.trim()
    if (origin) setActiveOrigin(origin)
  }

  return (
    <section className={styles.section} aria-labelledby="srt-location-title">
      <div className={styles.shell}>
        <div className={styles.details}>
          <span className={styles.eyebrow}>VISIT OUR CHENNAI TRAINING CENTRE</span>
          <h2 id="srt-location-title">Success Root Technologies</h2>
          <p className={styles.locality}><MapPin size={19} aria-hidden="true" /> West Mambalam, Chennai</p>
          <address>
            Old No. 8/1, New No. 15/1, First Floor,<br />
            Rajaji Street, West Mambalam,<br />
            Chennai, Tamil Nadu 600033, India
          </address>
          <div className={styles.actions}>
            <a href={`tel:${phone}`}><Phone size={18} aria-hidden="true" /> Call</a>
            <a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={18} aria-hidden="true" /> WhatsApp</a>
            <a href={directions} target="_blank" rel="noreferrer"><Navigation size={18} aria-hidden="true" /> Get Directions</a>
          </div>
          {enableDirectionsPlanner && (
            <form className={styles.planner} onSubmit={showDirections}>
              <h3>Plan Your Visit</h3>
              <p>Enter your starting location to see directions, distance and estimated travel time to Success Root Technologies, West Mambalam.</p>
              <label htmlFor="srt-starting-location">Starting location</label>
              <input
                id="srt-starting-location"
                value={startingLocation}
                onChange={(event) => setStartingLocation(event.target.value)}
                placeholder="Enter area, landmark or address"
                autoComplete="street-address"
                required
              />
              <fieldset>
                <legend>Travel mode</legend>
                <div className={styles.modes}>
                  {(['driving', 'transit', 'walking'] as const).map((mode) => (
                    <button key={mode} type="button" aria-pressed={travelMode === mode} onClick={() => setTravelMode(mode)}>
                      {mode[0].toUpperCase() + mode.slice(1)}
                    </button>
                  ))}
                </div>
              </fieldset>
              <div className={styles.plannerActions}>
                <button type="submit">Show Directions</button>
                <a href={openMapsUrl} target="_blank" rel="noreferrer">Open in Google Maps</a>
              </div>
            </form>
          )}
        </div>
        {activeMap ? (
          <div className={styles.mapWrap}>
            <iframe
              title={activeOrigin ? 'Directions to Success Root Technologies' : 'Success Root Technologies location in West Mambalam, Chennai'}
              src={activeMap}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        ) : (
          <div className={`${styles.mapWrap} ${styles.fallback}`}>
            <MapPin size={32} aria-hidden="true" />
            <strong>Success Root Technologies</strong>
            <span>West Mambalam, Chennai</span>
            <a href={directions} target="_blank" rel="noreferrer">Get Directions</a>
          </div>
        )}
      </div>
    </section>
  )
}
