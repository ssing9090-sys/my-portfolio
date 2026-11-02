import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import useGuestbook from '../../hooks/use-guestbook.js';
import ContactEmailButton from './contact-email-button.jsx';
import ContactPanel from './contact-panel.jsx';
import GuestbookForm from './guestbook-form.jsx';
import GuestbookList from './guestbook-list.jsx';
import SocialLinks from './social-links.jsx';

/** TODO: 실제 이메일 / 인스타그램 계정으로 교체 */
const CONTACT_EMAIL = 'your-email@example.com';
const INSTAGRAM_URL = 'https://www.instagram.com/';
const GITHUB_URL = 'https://github.com/ssing9090-sys';

const SOCIAL_LINKS = [
  { id: 'instagram', icon: <InstagramIcon />, label: 'Instagram', href: INSTAGRAM_URL },
  { id: 'github', icon: <GitHubIcon />, label: 'GitHub', href: GITHUB_URL },
  { id: 'email', icon: <EmailRoundedIcon />, label: 'Email', href: `mailto:${CONTACT_EMAIL}` },
];

/**
 * ContactSection 컴포넌트
 *
 * Home 페이지의 Contact 섹션. 핑크 톤의 친근하고 따뜻한 분위기로,
 * [이메일 | SNS] / [방명록 작성 | 방명록 채팅방] 을 좌우 2개씩 배치한다. (모바일은 세로 1열)
 *
 * Props:
 * @param {string} id - 섹션 앵커 id [Optional, 기본값: 'contact']
 * @param {string} order - 섹션 순번 표시 [Optional, 기본값: '05']
 *
 * Example usage:
 * <ContactSection id="contact" order="05" />
 */
function ContactSection({ id = 'contact', order = '05' }) {
  const { entries, isLoading, error, addEntry } = useGuestbook();

  return (
    <Box
      id={ id }
      component="section"
      aria-labelledby={ `${id}-title` }
      sx={{
        borderRadius: 3,
        border: 1,
        borderColor: 'primary.border',
        borderLeft: 6,
        borderLeftColor: 'primary.main',
        background: (theme) => `linear-gradient(180deg, ${theme.vars.palette.primary.light} 0%, ${theme.vars.palette.background.paper} 260px)`,
        px: { xs: 2, md: 4 },
        py: { xs: 3, md: 4 },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
        <Chip label={ order } size="small" sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', fontWeight: 700 }} />
        <Typography
          id={ `${id}-title` }
          component="h2"
          sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 800, lineHeight: 1.2, color: 'text.primary' }}
        >
          Contact
        </Typography>
      </Box>
      <Typography sx={{ fontSize: { xs: '0.95rem', md: '1.05rem' }, lineHeight: 1.6, color: 'text.secondary', mb: { xs: 3, md: 4 } }}>
        반가워요! 👋 궁금한 점이나 하고 싶은 이야기가 있다면 편하게 연락주세요.
        <br />
        방명록에 한마디 남겨주시면 귀여운 캐릭터가 대신 인사해드려요 💕
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: 2, md: 3 },
        }}
      >
        <ContactPanel emoji="💌" title="이메일" description="메일은 언제든 환영이에요">
          <ContactEmailButton email={ CONTACT_EMAIL } />
        </ContactPanel>

        <ContactPanel emoji="🌸" title="SNS" description="일상과 작업 기록을 구경해보세요">
          <SocialLinks links={ SOCIAL_LINKS } />
        </ContactPanel>

        <ContactPanel emoji="✍️" title="방명록 남기기" description="이름은 비공개, 캐릭터는 랜덤!">
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
  );
}

export default ContactSection;
