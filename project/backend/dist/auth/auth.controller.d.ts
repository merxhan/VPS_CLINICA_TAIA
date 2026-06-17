import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: {
        cpf: string;
        dob: string;
    }): Promise<{
        message: string;
        user: any;
        token: string;
    }>;
}
