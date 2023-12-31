import { ProfileImages } from 'src/profileImages/entities/profilesImages.entities';
import { Column, DeleteDateColumn, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Skills {

  @Column({
    primary: true,
    generated: true
  })
  id: number

  @Column()
  name: string;

  @DeleteDateColumn()
  deletedAt: Date;

  // Relacion con la tabla profileImages
  @ManyToOne(() => ProfileImages, (profileImage) => profileImage.id, {
    eager: true // Cuando se haga un findOne, se traerá la relación
  })
  name_src: ProfileImages

}
