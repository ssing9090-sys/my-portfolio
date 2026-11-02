import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import useGuestbook from '../../hooks/use-guestbook.js';
import ContactInfoList from './contact-info-list.jsx';
import GuestbookForm from './guestbook-form.jsx';
import GuestbookList from './guestbook-list.jsx';
import SocialLinks from './social-links.jsx';

/** TODO: 실제 이메일 / 지역 / 인스타그램 계정으로 교체 */
const CONTACT_EMAIL = 'your-email@example.com';
const INSTAGRAM_URL = 'https://www.instagram.com/';
const GITHUB_URL = 'https://github.com/ssing9090-sys';

const CONTACT_ITEMS = [
  { id: 'email', icon: <EmailOutlinedIcon fontSize="small" />, label: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { id: 'github', icon: <GitHubIcon fontSize="small" />, label: 'GitHub', value: 'github.com/ssing9090-sys', href: GITHUB_URL },
  { id: 'location', icon: <LocationOnOutlinedIcon fontSize="small" />, label: 'Location', value: 'Seoul, Korea' },
];

const SOCIAL_LINKS = [
  { id: 'github', icon: <GitHubIcon />, label: 'GitHub', href: GITHUB_URL },
  { id: 'instagram', icon: <InstagramIcon />, label: 'Instagram', href: INSTAGRAM_URL },
  { id: 'email', icon: <EmailOutlinedIcon />, label: 'Email', href: `mailto:${CONTACT_EMAIL}` },
];

/**
 * ContactSection 컴포넌트
 *
 * Home 페이지의 Contact 섹션. 연락처 → SNS → 방명록 작성 → 방명록 목록 순으로 세로 배치한다.
 * 무채색(검정/흰색/회색) 톤으로 깔끔하고 심플하게 구성한다.
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

  const subTitleSx = {
    fontSize: { xs: '1rem', md: '1.1rem' },
    fontWeight: 700,
    color: 'text.primary',
    mb: 2,
  };

  return (
    <Card
      id={ id }
      component="section"
      elevation={ 0 }
      sx={{
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider',
        borderLeft: 6,
        borderLeftColor: 'text.primary',
      }}
    >
      <CardContent sx={{ px: { xs: 2, md: 4 }, py: { xs: 3, md: 4 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
          <Chip
            label={ order }
            size="small"
            sx={{ bgcolor: 'text.primary', color: 'background.paper', fontWeight: 700 }}
          />
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              fontWeight: 800,
              lineHeight: 1.2,
              color: 'text.primary',
            }}
          >
            Contact
          </Typography>
        </Box>
        <Typography sx={{ fontSize: { xs: '0.95rem', md: '1.05rem' }, lineHeight: 1.6, color: 'text.secondary', mb: 4 }}>
          함께 이야기 나누고 싶으시다면 언제든 연락주세요. 방명록에 한마디 남겨주셔도 좋아요!
        </Typography>

        <Box component="section" aria-label="연락처" sx={{ mb: 4 }}>
          <Typography component="h3" sx={ subTitleSx }>연락처</Typography>
          <ContactInfoList items={ CONTACT_ITEMS } />
        </Box>

        <Box component="section" aria-label="SNS" sx={{ mb: 4 }}>
          <Typography component="h3" sx={ subTitleSx }>SNS</Typography>
          <SocialLinks links={ SOCIAL_LINKS } />
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Box component="section" aria-label="방명록 작성" sx={{ mb: 4 }}>
          <Typography component="h3" sx={ subTitleSx }>방명록 남기기</Typography>
          <GuestbookForm onSubmit={ addEntry } />
        </Box>

        <Box component="section" aria-label="방명록 목록">
          <Typography component="h3" sx={ subTitleSx }>방명록</Typography>
          <GuestbookList entries={ entries } isLoading={ isLoading } error={ error } />
        </Box>
      </CardContent>
    </Card>
  );
}

export default ContactSection;
