import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);

// Usage example in controller:
// @Get('profile')
// @UseGuards(JwtAuthGuard)
// getProfile(@CurrentUser() user: any) {
//   return this.adminService.getProfile(user.sub);
// }
