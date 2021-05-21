import React from 'react'
import styles from './cluster.module.less'

type ClusterCardProps = { title: string; address: string; img: string }
type ClusterList = Array<ClusterCardProps>

const ClusterCard = ({ title, address, img }: ClusterCardProps) => {
  return (
    <div className={styles.clusterCard}>
      <img src={img} alt="" className={styles.clusterImg} />
      <div className={styles.clusterInfo}>
        <div className={styles.clusterTitle}>{title}</div>
        <div className={styles.clusterAddress}>{address}</div>
      </div>
    </div>
  )
}

const Cluster = () => {
  const cards: ClusterList = [
    {
      img: '',
      title: '针织服装',
      address: '宁波象山',
    },
    {
      img: '',
      title: '针织服装',
      address: '宁波象山',
    },
    {
      img: '',
      title: '针织服装',
      address: '宁波象山',
    },
    {
      img: '',
      title: '针织服装',
      address: '宁波象山',
    },
    {
      img: '',
      title: '针织服装',
      address: '宁波象山',
    },
  ]
  return (
    <div className={styles.cluster}>
      <div className={styles.clusterTitle}>产业聚集区</div>

      <div className={styles.clusterList}>
        {cards.map((item, idx) => (
          <ClusterCard {...item} key={idx}></ClusterCard>
        ))}
      </div>
    </div>
  )
}

export default Cluster
