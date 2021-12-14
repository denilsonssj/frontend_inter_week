import { 
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn
} from 'typeorm';

import generateRandomUUID from '../utils/generateRandomUUID';

import { User } from './User';

@Entity()
export class Pix {

    @PrimaryColumn({ name: 'id', type: 'uuid' })
    id: string;

    @Column({ name: 'status' })
    status: string;

    @Column({ name: 'value' })
    value: number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'requesting_user_id' })
    requestingUser: User;

    @ManyToOne(() => User, user => user.id, { nullable: true })
    @JoinColumn({ name: 'paying_user_id' })
    payingUser: User;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    constructor() {
        if (!this.id) {
            this.id = generateRandomUUID();
        }
    }

}