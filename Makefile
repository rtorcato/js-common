# Targets
.PHONY: password commit version-bump docker-login clean password

CLEAN_ITEMS := dist node_modules .turbo .next coverage

docker-login:
	docker login registry.gitlab.com

commit:
	@echo "Select commit type:"; \
	select type in feat fix ci chore docs test style refactor perf build revert; do \
		[ -n "$$type" ] && break; \
	done; \
	read -p "Enter commit description: " description; \
	read -p "Skip CI? (y/n): " skip_ci; \
	msg="$$type"; \
	msg="$$msg: $$description"; \
	if [ "$$skip_ci" = "y" ]; then \
		msg="$$msg [skip ci]"; \
	fi; \
	echo ""; \
	echo "🔍 Commit preview:"; \
	echo "$$msg"; \
	read -p "Is this okay? (y/n): " confirm; \
	if [ "$$confirm" != "y" ]; then \
		echo "❌ Commit aborted."; \
		exit 1; \
	fi; \
	git add -A; \
	git commit -m "$$msg"; \
	echo ""; \
	echo ""; \
	read -p "Do you want to push the commit? (y/n): " push_confirm; \
	if [ "$$push_confirm" = "y" ]; then \
		git push; \
	else \
		echo "🚫 Commit not pushed."; \
	fi;


version-bump:
	@VERSION=$$(cat VERSION.txt); \
	IFS='.' read -r MAJOR MINOR PATCH <<< "$$VERSION"; \
	echo "Current version: $$VERSION"; \
	read -p "Which part to bump? (major/minor/patch): " part; \
	if [ "$$part" = "major" ]; then \
		MAJOR=$$((MAJOR + 1)); MINOR=0; PATCH=0; \
	elif [ "$$part" = "minor" ]; then \
		MINOR=$$((MINOR + 1)); PATCH=0; \
	elif [ "$$part" = "patch" ]; then \
		PATCH=$$((PATCH + 1)); \
	else \
		echo "❌ Invalid input. Use major, minor, or patch."; exit 1; \
	fi; \
	echo "$$MAJOR.$$MINOR.$$PATCH" > VERSION.txt; \
	echo "✅ Version bumped to $$(cat VERSION.txt)"

clean:
	@echo "🧹 Cleaning $(CLEAN_ITEMS)..."
	@rm -rf $(CLEAN_ITEMS)
	@echo "✅ Clean complete."

password:
	@echo "Select password type:"; \
	select opt in "Postgres Password" "Authentik Secret Key" "Redis Password" "Random Password" "Exit"; do \
		case $$opt in \
			"Postgres Password"|"Authentik Secret Key"|"Redis Password"|"Random Password") \
				echo "Select password length:"; \
				select len in 16 32 64; do \
					[ -n "$$len" ] && break; \
				done; \
				if [ "$$opt" = "Authentik Secret Key" ]; then \
					pw=$$(openssl rand -hex $$len); \
				else \
					pw=$$(openssl rand -base64 $$len); \
				fi; \
				echo ""; \
				echo "🔑 Generated $$opt:"; \
				echo "$$pw"; \
				echo ""; \
				read -p "Copy to clipboard? (y/n): " copy_confirm; \
				if [ "$$copy_confirm" = "y" ]; then \
					echo "$$pw" | $(CLIP_CMD); \
					echo "📋 Copied to clipboard!"; \
				else \
					echo "🚫 Not copied."; \
				fi; \
				break;; \
			"Exit") \
				echo "👋 Exiting."; \
				break;; \
			*) \
				echo "❌ Invalid option. Try again."; \
				;; \
		esac; \
	done

# OS detection for clipboard
ifeq ($(shell uname), Darwin)
  CLIP_CMD = pbcopy
else
  CLIP_CMD = xclip -selection clipboard
endif