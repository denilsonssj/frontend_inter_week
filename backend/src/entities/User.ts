import { 
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn 
} from "typeorm";

import generateRandomUUID from "../utils/generateRandomUUID";

@Entity({ name: 'users' })
export class User {

    @PrimaryColumn({ name: 'id', type: 'uuid' })
    id: string;

    @Column({ name: 'first_name' })
    firstName: string;

    @Column({ name: 'last_name' })
    lastName: string;

    @Column({ name: 'account_number' })
    accountNumber: number;

    @Column({ name: 'account_digit' })
    accountDigit: number;

    @Column({ name: 'wallet' })
    wallet: number;

    @Column({ name: 'email' })
    email: string;

    @Column({ name: 'password' })
    password: string;

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