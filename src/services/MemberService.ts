import type { Member } from "../generated/prisma/client";
import { MemberRepository } from "../repositories/MemberRepository";

export class MemberService {
  constructor(private memberRepository: MemberRepository) {}

  async getAllMembers(query: Record<string, any> = {}): Promise<Member[]> {
    const members = await this.memberRepository.findAll(query);
    return members;
  }
}

// Export singleton instance
const memberRepository = new MemberRepository();
export const memberService = new MemberService(memberRepository);
