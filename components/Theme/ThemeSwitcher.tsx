import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useThemeStore } from '@/stores/themeStore';
import { THEME_OPTIONS, type ThemeId } from '@/types/theme';

export function ThemeSwitcher() {
  const { themeId, setTheme } = useThemeStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Palette className="size-4" />
          主题
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>切换主题</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={themeId} onValueChange={(value) => void setTheme(value as ThemeId)}>
          {THEME_OPTIONS.map((theme) => (
            <DropdownMenuRadioItem key={theme.id} value={theme.id}>
              <div className="flex flex-col">
                <span>{theme.label}</span>
                {theme.description ? (
                  <span className="text-muted-foreground text-xs font-normal">{theme.description}</span>
                ) : null}
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
