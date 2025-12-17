import { motion } from 'framer-motion';
import { Heart, ThumbsUp, X } from 'lucide-react';
import { fadeUp } from '@/lib/motion';

export function VisionBuckets() {
  return (
    <motion.div
      className="flex justify-center items-center gap-8 text-sm"
      initial={fadeUp.initial}
      animate={fadeUp.animate}
      transition={{ ...fadeUp.transition, delay: 0.2 }}
    >
      <div className="flex items-center gap-2 text-red">
        <X className="w-4 h-4" />
        <span>Pass</span>
        <span className="text-text-muted">(swipe left)</span>
      </div>
      <div className="flex items-center gap-2 text-amber">
        <ThumbsUp className="w-4 h-4" />
        <span>Like</span>
        <span className="text-text-muted">(swipe up)</span>
      </div>
      <div className="flex items-center gap-2 text-pink">
        <Heart className="w-4 h-4" />
        <span>Love</span>
        <span className="text-text-muted">(swipe right)</span>
      </div>
    </motion.div>
  );
}
