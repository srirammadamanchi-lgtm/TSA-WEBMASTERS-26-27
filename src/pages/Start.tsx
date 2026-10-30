import { useState } from 'react'
import { useNavigate } from 'react-router'
import { SITE_NAME } from '../site'
import { MODELS, nextUnlock, rankFor, unlockedModels, type GameModel } from '../game'
import { PALETTE } from '../palette'
import { setFavorite, useProfile } from '../profile'
import { GearIcon, LockIcon, RankEmblem, TrophyIcon } from '../components/Icons'
import { ProfileSetup } from '../components/ProfileSetup'
import { ProgressBar } from '../components/ProgressBar'
import CountUp from '../components/reactbits/CountUp'
import ShinyText from '../components/reactbits/ShinyText'
import SpotlightCard from '../components/reactbits/SpotlightCard'
import StarBorder from '../components/reactbits/StarBorder'
import TiltedCard from '../components/reactbits/TiltedCard'

function ModelTile({ model, trophies, favorite }: { model: GameModel; trophies: number; favorite: boolean }) {
  const unlocked = trophies >= model.unlockAt
  return (
    <SpotlightCard className={`p-0! rounded-2xl! ${favorite ? 'ring-2 ring-accent' : ''}`}>
      <button
        type="button"
        aria-pressed={unlocked ? favorite : undefined}
        aria-disabled={unlocked ? undefined : true}
        aria-label={unlocked ? `${model.name}, ${model.strength}` : `${model.name}, locked, unlocks at ${model.unlockAt} credits`}
        onClick={() => unlocked && setFavorite(model.id)}
        className="flex w-full flex-col items-center gap-1 p-3 text-center"
      >
        <span className="relative">
          <img
            src={model.art}
            alt=""
            width={96}
            height={96}
            className={`size-20 sm:size-24 ${unlocked ? '' : 'grayscale opacity-30'}`}
          />
          {!unlocked && (
            <span className="absolute right-0 top-0 rounded-full bg-card p-1 text-muted">
              <LockIcon />
            </span>
          )}
        </span>
        <span className="font-display text-lg">{model.name}</span>
        <span className="text-sm text-muted">{unlocked ? model.strength : `Unlocks at ${model.unlockAt}`}</span>
      </button>
    </SpotlightCard>
  )
}

export function Start() {
  const profile = useProfile()
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)

  const { trophies } = profile
  const unlocked = unlockedModels(trophies)
  const favorite = MODELS.find((m) => m.id === profile.favoriteModel) ?? MODELS[0]
  const rank = rankFor(trophies)
  const next = nextUnlock(trophies)
  const floor = unlocked.at(-1)?.unlockAt ?? 0
  const needsSetup = profile.nickname === null

  return (
    <>
      <title>{SITE_NAME}</title>
      <ProfileSetup open={needsSetup || editing} required={needsSetup} onClose={() => setEditing(false)} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <section aria-label="Player">
          <div className="flex items-center gap-3">
            <img
              src={`/art/avatars/${profile.avatar}.svg`}
              alt="Your avatar"
              className="size-16 shrink-0 rounded-full border-2 border-accent bg-ink"
            />
            <h1 className="min-w-0 flex-1 truncate font-display text-3xl">{profile.nickname ?? 'Player'}</h1>
            <button
              type="button"
              aria-label="Edit profile"
              onClick={() => setEditing(true)}
              className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-card text-ink hover:border-brand"
            >
              <GearIcon />
            </button>
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-muted">Favorite AI model</p>
          <div className="mt-2 flex justify-center">
            <TiltedCard
              key={favorite.id}
              imageSrc={favorite.art}
              altText={`${favorite.name} AI model art`}
              containerHeight={360}
              imageWidth="min(100%, 20rem)"
              imageHeight={340}
              showTooltip={false}
              gyroscope={false}
              glareColor={PALETTE.ink}
            >
              <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-card to-brand-dark" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/85 to-transparent p-4 pt-12">
                <div>
                  <p className="font-display text-3xl text-ink">{favorite.name}</p>
                  <p className="text-sm text-muted">{favorite.strength}</p>
                </div>
                <RankEmblem rank={rank.name} size={48} />
              </div>
            </TiltedCard>
          </div>
        </section>

        <div className="flex flex-col gap-6">
          <section aria-labelledby="credits-title" className="card">
            <h2 id="credits-title" className="font-display text-3xl">
              <ShinyText text="Token-Maxing Credits" color={PALETTE.ink} shineColor={PALETTE.muted} />
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
              <p className="flex items-center gap-2 text-accent">
                <TrophyIcon size={36} />
                <CountUp to={trophies} trigger="load" separator="," className="font-display text-5xl" />
              </p>
              <p className="flex items-center gap-2 font-display text-xl">
                <RankEmblem rank={rank.name} />
                Rank {rank.name}
              </p>
            </div>
            <div className="mt-4">
              {next ? (
                <>
                  <p className="mb-2 text-muted">
                    Next unlock: <span className="font-semibold text-ink">{next.model.name}</span> in {next.remaining}
                  </p>
                  <ProgressBar
                    value={((trophies - floor) / (next.model.unlockAt - floor)) * 100}
                    label={`Progress to ${next.model.name}`}
                  />
                </>
              ) : (
                <p className="font-semibold">Every AI model collected!</p>
              )}
            </div>
          </section>

          <section aria-labelledby="models-title" className="card">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 id="models-title" className="font-display text-2xl">
                AI Models
              </h2>
              <p className="font-semibold text-muted">
                {unlocked.length} / {MODELS.length} Collected
              </p>
            </div>
            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {MODELS.map((m) => (
                <li key={m.id}>
                  <ModelTile model={m} trophies={trophies} favorite={m.id === favorite.id} />
                </li>
              ))}
            </ul>
          </section>

          <div className="flex justify-center py-2">
            <StarBorder
              color={PALETTE.accent}
              backgroundColor={PALETTE.card}
              textColor={PALETTE.accent}
              className="px-12 py-4 font-display text-3xl"
              onClick={() => navigate('/learn')}
            >
              Start
            </StarBorder>
          </div>
        </div>
      </div>
    </>
  )
}
