export class HealthCheckController {
    async healthCheck(req: any, res: any) {
        return res.json({ status: "UP" });
    }
}