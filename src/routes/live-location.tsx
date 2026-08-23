import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/live-location')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/live-location"!</div>
}
