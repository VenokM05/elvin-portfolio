"use client"

import { useState } from "react"
import { Activity, Monitor, Network, Router, Server, Wifi } from "lucide-react"
import { networkNodes } from "@/lib/specialty-data"

const icons = { gateway: Router, switch: Network, server: Server, workstation: Monitor, wireless: Wifi }

export function ITTopology() {
  const [selected, setSelected] = useState<(typeof networkNodes)[number]["id"]>("switch")
  const node = networkNodes.find((item) => item.id === selected)!
  return (
    <div className="sp-panel sp-topology">
      <div className="sp-panel-bar"><span><Activity size={14} aria-hidden="true" />infrastructure.map</span><span className="sp-tag sp-tag-accent">ILLUSTRATIVE LAB</span></div>
      <div className="sp-topology-map" role="group" aria-label="Interactive sample network. Select a device to explore its role.">
        <svg className="sp-network-lines" viewBox="0 0 500 335" preserveAspectRatio="none" aria-hidden="true">
          <path d="M250 60 V168 M250 168 H400 M250 168 V220 H100 V275 M250 168 V220 H400 V275" />
          <path className="sp-packet" d="M250 60 V168 M250 168 H400 M250 168 V220 H100 V275 M250 168 V220 H400 V275" />
        </svg>
        {networkNodes.map((item) => {
          const Icon = icons[item.id]
          return <button type="button" key={item.id} className="sp-network-node" data-node={item.id} aria-pressed={selected === item.id} aria-controls="network-detail" onClick={() => setSelected(item.id)}><Icon size={23} aria-hidden="true" />{item.label}</button>
        })}
      </div>
      <div id="network-detail" className="sp-node-detail" aria-live="polite"><h3>{node.label}<span className="sp-tag">{node.focus}</span></h3><p>{node.description}</p></div>
      <div className="sp-terminal-line">Select a device · Concept diagram, not a live network</div>
    </div>
  )
}
