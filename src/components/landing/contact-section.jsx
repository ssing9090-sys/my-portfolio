import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import useGuestbook from '../../hooks/use-guestbook.js';
import { INK, SERIF_FONT, VIVID } from '../../theme.js';
import ContactEmailButton from './contact-email-button.jsx';
import ContactPanel from './contact-panel.jsx';
import GuestbookForm from './guestbook-form.jsx';
import GuestbookList from './guestbook-list.jsx';
import { DISPLAY_TITLE_SX, SECTION_INNER_SX } from './landing-styles.js';
import MarqueeBand from './marquee-band.jsx';
import SocialLinks from './social-links.jsx';

const CONTACT_EMAIL = 'ssing9090@gmail.com';
const INSTAGRAM_URL = 'https://www.instagram.com/11.25.hj';
const GITHUB_URL = 'https://github.com/ssing9090-sys';

const SOCIAL_LINKS = [
  { id: 'instagram', icon: <InstagramIcon />, label: 'Instagram', href: INSTAGRAM_URL },
  { id: 'github', icon: <GitHubIcon />, label: 'GitHub', href: GITHUB_URL },
  { id: 'email', icon: <EmailRoundedIcon />, label: 'Email', href: `mailto:${CONTACT_EMAIL}` },
];

/** 흘러가는 띠에 들어갈 해시태그 */
const MARQUEE_WORDS = ['HYUNJIN', 'FRONTEND', 'REACT', 'PORTFOLIO', 'SAYHELLO'];

/**
 * ContactSection 컴포넌트
 *
 * Home 페이지의 Contact 섹션. 검정 배경 위에 흘러가는 해시태그 띠와 초대형 'SAY HELLO' 제목,
 * 그 아래 [이메일 | SNS] / [방명록 작성 | 방명록 채팅방] 흰 카드를 좌우 2개씩 배치한다. (모바일은 세로 1열)
 *
 * Props:
 * @param {string} id - 섹션 앵커 id [Optional, 기본값: 'contact']
 *
 * Example usage:
 * <ContactSection id="contact" />
 */
function ContactSection({ id = 'contact' }) {
  const { entries, isLoading, error, addEntry } = useGuestbook();

  return (
    <Box
      id={ id }
      component="section"
      aria-labelledby={ `${id}-title` }
      tabIndex={ -1 }
      sx={{ bgcolor: INK, color: '#FFFFFF', pt: { xs: 3, md: 5 }, pb: { xs: 8, md: 12 }, outline: 'none' }}
    >
      <Box sx={{ px: { xs: 1.5, md: 3 } }}>
        <MarqueeBand words={ MARQUEE_WORDS } />
      </Box>

      <Box sx={{ ...SECTION_INNER_SX, mt: { xs: 7, md: 12 } }}>
        <Typography sx={{ textAlign: 'center', fontFamily: SERIF_FONT, fontStyle: 'italic', fontSize: { xs: '1.3rem', md: '1.75rem' }, color: VIVID.green.main, mb: 1 }}>
          let&apos;s talk
        </Typography>
        <Typography id={ `${id}-title` } component="h2" sx={{ ...DISPLAY_TITLE_SX, color: '#FFFFFF' }}>
          Say{ ' ' }
          <br />
          hello
        </Typography>
        <Typography
          sx={{
            mt: 3,
            mb: { xs: 5, md: 8 },
            textAlign: 'center',
            fontSize: { xs: '1rem', md: '1.1rem' },
            lineHeight: 1.7,
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.72)',
            wordBreak: 'keep-all',
          }}
        >
          궁금한 점이나 하고 싶은 이야기가 있다면 편하게 연락주세요.
          <br />
          방명록에 한마디 남겨주시면 귀여운 캐릭터가 대신 인사해드려요 💕
        </Typography>

        <Box
          sx={{
            maxWidth: 1040,
            mx: 'auto',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 2, md: 3 },
            color: 'text.primary',
          }}
        >
          <ContactPanel emoji="💌" title="이메일" description="메일은 언제든 환영이에요">
            <ContactEmailButton email={ CONTACT_EMAIL } />
          </ContactPanel>

          <ContactPanel emoji="🌸" title="SNS" description="일상과 작업 기록을 구경해보세요">
            <SocialLinks links={ SOCIAL_LINKS } />
          </ContactPanel>

          <ContactPanel emoji="✍️" title="방명록 남기기" description="프로필 캐릭터는 랜덤으로 뽑혀요!">
            <GuestbookForm onSubmit={ addEntry } />
          </ContactPanel>

          <ContactPanel
            emoji="💬"
            title="방명록"
            description={ entries.length > 0 ? `최근 메시지 ${entries.length}개 · 최신순` : '최신순으로 보여드려요' }
          >
            <GuestbookList entries={ entries } isLoading={ isLoading } error={ error } />
          </ContactPanel>
        </Box>
      </Box>
    </Box>
  );
}

export default ContactSection;
