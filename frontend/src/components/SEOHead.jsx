/**
 * SEOHead Component — Drop-in per-page SEO wrapper
 * 
 * Usage:
 *   <SEOHead
 *     title="Page Title | JCS Consultancy"
 *     description="Page description..."
 *     canonical="https://www.jamiaconsultancyservices.in/page"
 *   />
 */
import { useSEO } from '../hooks/useSEO';

const SEOHead = (props) => {
  useSEO(props);
  return null; // renders nothing — only injects head tags
};

export default SEOHead;
